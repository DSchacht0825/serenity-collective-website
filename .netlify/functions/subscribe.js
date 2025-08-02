 const BREVO_API_KEY =
  'xkeysib-e96ed4688789f508b135f9a2f0bbc4227c65c8bccf348
  d913f1cc501a39b5e79-pyMvnZdpeB1qk5Y5';
  const BREVO_LIST_ID = 3;

  exports.handler = async (event, context) => {
      const headers = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
  'Content-Type',
          'Access-Control-Allow-Methods': 'POST, 
  OPTIONS'
      };

      if (event.httpMethod === 'OPTIONS') {
          return { statusCode: 200, headers, body: '' };
      }

      if (event.httpMethod !== 'POST') {
          return { statusCode: 405, headers, body:
  JSON.stringify({ error: 'Method not allowed' }) };
      }

      try {
          const { email, firstName, lastName, city,
  state, phone, interests } = JSON.parse(event.body);

          if (!email || !firstName || !lastName) {
              return { statusCode: 400, headers, body:
  JSON.stringify({ error: 'Email, first name, and last 
  name are required' }) };
          }

          const contactData = {
              email: email,
              attributes: {
                  FIRSTNAME: firstName,
                  LASTNAME: lastName,
                  ...(city && { CITY: city }),
                  ...(state && { STATE: state }),
                  ...(phone && { PHONE: phone }),
                  ...(interests && { INTERESTS:
  interests })
              },
              listIds: [BREVO_LIST_ID],
              updateEnabled: true
          };

          const response = await
  fetch('https://api.brevo.com/v3/contacts', {
              method: 'POST',
              headers: { 'Content-Type':
  'application/json', 'api-key': BREVO_API_KEY },
              body: JSON.stringify(contactData)
          });

          if (response.ok) {
              const result = await response.json();
              return { statusCode: 200, headers, body:
  JSON.stringify({ success: true, message: 'Welcome to 
  our community! Check your email for confirmation.',
  contactId: result.id }) };
          } else {
              const error = await response.json();
              if (error.code === 'duplicate_parameter')
  {
                  return { statusCode: 200, headers,
  body: JSON.stringify({ success: true, message: 'You 
  are already subscribed to our mailing list!' }) };
              }
              return { statusCode: 400, headers, body:
  JSON.stringify({ error: 'Failed to subscribe',
  details: error.message }) };
          }
      } catch (error) {
          return { statusCode: 500, headers, body:
  JSON.stringify({ error: 'Internal server error',
  message: error.message }) };
      }
  };
