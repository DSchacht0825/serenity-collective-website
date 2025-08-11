// Email subscription handler for Serenity Collective
// Requires BREVO_API_KEY environment variable to be set in Netlify
exports.handler = async (event, context) => {
    // CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers, body: '' };
    }

    // Only allow POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    try {
      // Parse form data
      const data = JSON.parse(event.body);

      // Prepare for Brevo
      const contactData = {
        email: data.email,
        attributes: {
          FIRSTNAME: data.firstName || '',
          LASTNAME: data.lastName || ''
        },
        listIds: [3],
        updateEnabled: true
      };

      // Add optional fields
      if (data.city) contactData.attributes.CITY = data.city;
      if (data.state) contactData.attributes.STATE = data.state;
      if (data.phone) contactData.attributes.PHONE = data.phone;
      if (data.interests) contactData.attributes.INTERESTS = data.interests;

      // Call Brevo API
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY
        },
        body: JSON.stringify(contactData)
      });

      // Handle response
      if (response.ok) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Welcome to our community! Check your email for confirmation.'
          })
        };
      }

      // Handle errors
      const error = await response.json();
      if (error.code === 'duplicate_parameter') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'You are already subscribed!'
          })
        };
      }

      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Subscription failed' })
      };

    } catch (error) {
      console.error('Error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server error' })
      };
    }
  };
