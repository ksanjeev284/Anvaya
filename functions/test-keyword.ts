interface Env {
  DB: any; // We'll use 'any' temporarily since D1Database type isn't available
}

export async function onRequest(context: { env: Env; request: Request }) {
  const url = new URL(context.request.url);
  const keyword = url.searchParams.get('keyword');

  if (!keyword) {
    return new Response(
      JSON.stringify({ success: false, message: 'Keyword is required.' }),
      {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      }
    );
  }

  try {
    const result = await context.env.DB.prepare(
      'SELECT * FROM keywords WHERE keyword = ?'
    )
    .bind(keyword)
    .all();

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    if (result.results.length > 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Keyword "${keyword}" found in database.` 
        }),
        { headers }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: `Keyword "${keyword}" not found in database.` 
        }),
        { headers }
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
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      }
    );
  }
}
