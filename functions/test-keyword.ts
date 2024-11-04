export async function onRequest(context) {
    const url = new URL(context.request.url);
    const keyword = url.searchParams.get('keyword');
  
    if (!keyword) {
      return new Response(
        JSON.stringify({ success: false, message: 'Keyword is required.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  
    try {
      const result = await context.env.DB.prepare(
        'SELECT * FROM keywords WHERE keyword = ?'
      ).bind(keyword).all();
  
      if (result.results.length > 0) {
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: `Keyword "${keyword}" found in database.` 
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: `Keyword "${keyword}" not found in database.` 
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      }
    } catch (error) {
      console.error('Error testing keyword:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Error testing keyword.' 
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }