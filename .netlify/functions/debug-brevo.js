// Debug function to test Brevo API connection
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
        const apiKey = process.env.BREVO_API_KEY;
        
        if (!apiKey) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    error: 'BREVO_API_KEY not found'
                })
            };
        }

        // Test 1: Get account info
        const accountResponse = await fetch('https://api.brevo.com/v3/account', {
            method: 'GET',
            headers: {
                'api-key': apiKey
            }
        });

        const accountData = await accountResponse.json();

        // Test 2: Get lists
        const listsResponse = await fetch('https://api.brevo.com/v3/contacts/lists', {
            method: 'GET',
            headers: {
                'api-key': apiKey
            }
        });

        const listsData = await listsResponse.json();

        // Test 3: Try to create a test contact
        const testContact = {
            email: 'debug-test@example.com',
            attributes: {
                FIRSTNAME: 'Debug',
                LASTNAME: 'Test'
            },
            listIds: [3],
            updateEnabled: true
        };

        const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(testContact)
        });

        const contactData = await contactResponse.json();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                api_key_present: !!apiKey,
                api_key_start: apiKey ? apiKey.substring(0, 12) + '...' : 'none',
                account_status: accountResponse.status,
                account_data: accountData,
                lists_status: listsResponse.status,
                lists_data: listsData,
                contact_creation_status: contactResponse.status,
                contact_creation_response: contactData
            }, null, 2)
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