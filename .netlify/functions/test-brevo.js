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

        // Test simple API call to get account info
        const response = await fetch('https://api.brevo.com/v3/account', {
            method: 'GET',
            headers: {
                'api-key': apiKey
            }
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
                account_info: response.ok ? { email: result.email } : 'Failed to fetch'
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