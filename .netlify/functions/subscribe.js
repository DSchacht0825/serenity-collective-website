  exports.handler = async (event, context) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, headers, body:
  JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
      const { email, firstName, lastName, city, state,
  phone, interests } = JSON.parse(event.body);

      if (!email || !firstName || !lastName) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Email, first 
  name, and last name are required' })
        };
      }

      const contactData = {
        email: email,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
          ...(city && { CITY: city }),
          ...(state && { STATE: state }),
          ...(phone && { PHONE: phone }),
          ...(interests && { INTERESTS: interests })
        },
        listIds: [3],
        updateEnabled: true
      };

      const response = await
  fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key':
  'xkeysib-e96ed4688789f508b135f9a2f0bbc4227c65c8bccf348
  d913f1cc501a39b5e79-pyMvnZdpeB1qk5Y5'
        },
        body: JSON.stringify(contactData)
      });

      if (response.ok) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Welcome to our community! Check 
  your email for confirmation.'
          })
        };
      } else {
        const error = await response.json();
        if (error.code === 'duplicate_parameter') {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              message: 'You are already subscribed to 
  our mailing list!'
            })
          };
        }
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Failed to 
  subscribe' })
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Something went 
  wrong. Please try again.' })
      };
    }
  };
