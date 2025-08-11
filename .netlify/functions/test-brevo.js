// Test function to verify Brevo API connection
exports.handler = async (event, context) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers, body: '' };
    }

    try {
        // Check if API key exists
        const apiKey = process.env.BREVO_API_KEY;
        
        if (!apiKey) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    error: 'BREVO_API_KEY not found',
                    env_keys: Object.keys(process.env).filter(k => k.includes('BREVO') || k.includes('API'))
                })
            };
        }

        // Test the contacts endpoint we actually use
        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify({
                email: 'test@example.com',
                attributes: {
                    FIRSTNAME: 'Test',
                    LASTNAME: 'User'
                },
                listIds: [4],
                updateEnabled: true
            })
        });

        const result = await response.json();
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                api_key_present: !!apiKey,
                api_key_length: apiKey ? apiKey.length : 0,
                api_response_status: response.status,
                response_ok: response.ok,
                result: result,
                api_key_start: apiKey ? apiKey.substring(0, 8) + '...' : 'none'
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: error.message,
                stack: error.stack
            })
        };
    }
};