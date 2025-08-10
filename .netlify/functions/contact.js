// Contact form handler for Serenity Collective
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

      // Validate required fields
      if (!data.name || !data.email || !data.subject || !data.message) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing required fields' })
        };
      }

      // Prepare contact data for Brevo
      const contactData = {
        email: data.email,
        attributes: {
          FIRSTNAME: data.name.split(' ')[0] || data.name,
          LASTNAME: data.name.split(' ').slice(1).join(' ') || '',
          PHONE: data.phone || '',
          CONTACT_SUBJECT: data.subject,
          CONTACT_MESSAGE: data.message,
          SOURCE: 'Contact Form'
        },
        listIds: [4], // Create a separate list for contact form submissions
        updateEnabled: true
      };

      // Add contact to Brevo
      const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY
        },
        body: JSON.stringify(contactData)
      });

      // Send notification email to info@serenitycollective.org
      const emailNotification = {
        sender: {
          name: "Serenity Collective Website",
          email: "noreply@serenitycollective.org"
        },
        to: [
          {
            email: "info@serenitycollective.org",
            name: "Serenity Collective"
          }
        ],
        subject: `New Contact Form Submission: ${data.subject}`,
        htmlContent: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p style="color: #666; font-size: 12px;">
            This email was sent from the Serenity Collective contact form at serenitycollective.org
          </p>
        `,
        textContent: `
          New Contact Form Submission
          
          From: ${data.name}
          Email: ${data.email}
          Phone: ${data.phone || 'Not provided'}
          Subject: ${data.subject}
          
          Message:
          ${data.message}
          
          ---
          This email was sent from the Serenity Collective contact form at serenitycollective.org
        `
      };

      // Send notification email via Brevo
      const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY
        },
        body: JSON.stringify(emailNotification)
      });

      // Check if both operations succeeded
      if (brevoResponse.ok && emailResponse.ok) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Thank you for your message! We\'ll get back to you within 24 hours.'
          })
        };
      }

      // Handle partial success
      if (brevoResponse.ok) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Thank you for your message! We\'ll get back to you soon.'
          })
        };
      }

      // Handle errors
      const error = await brevoResponse.json();
      console.error('Brevo error:', error);
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to process contact form submission' 
        })
      };

    } catch (error) {
      console.error('Contact form error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Server error processing contact form' 
        })
      };
    }
  };