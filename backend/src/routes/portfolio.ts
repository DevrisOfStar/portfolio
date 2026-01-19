import { getFullPortfolio, getPersonalInfo, getCareer, getIntroStatements, getGeneralTendencies, getHobbies, getLanguageSkills, getBasicAbilities, getWorkSkills, getThingsToAvoid, getCurrentStatus } from '../db/queries';

export async function handlePortfolioRoutes(request: Request, db: D1Database): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Full portfolio data
    if (path === '/api/portfolio' || path === '/api/portfolio/') {
      try {
        const data = await getFullPortfolio(db);
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error: any) {
        console.error('Error in getFullPortfolio:', error);
        return new Response(JSON.stringify({ 
          error: 'Failed to fetch portfolio data',
          message: error?.message || 'Unknown error'
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Personal info
    if (path === '/api/portfolio/personal') {
      const data = await getPersonalInfo(db);
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Career
    if (path === '/api/portfolio/career') {
      const data = await getCareer(db);
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Intro statements
    if (path === '/api/portfolio/intro-statements') {
      const data = await getIntroStatements(db);
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // General tendencies
    if (path === '/api/portfolio/general-tendencies') {
      const data = await getGeneralTendencies(db);
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Hobbies
    if (path === '/api/portfolio/hobbies') {
      const data = await getHobbies(db);
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Language skills
    if (path === '/api/portfolio/language-skills') {
      const data = await getLanguageSkills(db);
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Basic abilities
    if (path === '/api/portfolio/basic-abilities') {
      const data = await getBasicAbilities(db);
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Work skills
    if (path === '/api/portfolio/work-skills') {
      const data = await getWorkSkills(db);
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Things to avoid
    if (path === '/api/portfolio/things-to-avoid') {
      const data = await getThingsToAvoid(db);
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Current status
    if (path === '/api/portfolio/current-status') {
      const data = await getCurrentStatus(db);
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  } catch (error) {
    console.error('Error handling portfolio route:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
