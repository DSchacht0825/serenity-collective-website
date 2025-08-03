  exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Method not 
  allowed' })
      };
    }

    try {
      const data = JSON.parse(event.body);

      const response = await
  fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key':
  'xkeysib-e96ed4688789f508b135f9a2f0bbc4227c65c8bccf348
  d913f1cc501a39b5e79-pyMvnZdpeB1qk5Y5'
        },
        body: JSON.stringify({
          email: data.email,
          attributes: {
            FIRSTNAME: data.firstName,
            LASTNAME: data.lastName
          },
          listIds: [3],
          updateEnabled: true
        })
      });

      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          success: true,
          message: 'Welcome to our community!'
        })
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Something went 
  wrong' })
      };
    }
  };
