import { getFullPortfolio, getPersonalInfo, getCareer, getIntroStatements, getGeneralTendencies, getHobbies, getLanguageSkills, getBasicAbilities, getWorkSkills, getThingsToAvoid, getCurrentStatus } from '../db/queries';
import { createCorsHeaders, createJsonHeaders } from '../utils/cors';
import type { Env } from '../index';

export async function handlePortfolioRoutes(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;
  const corsHeaders = createCorsHeaders(request, env, {
    methods: 'GET, OPTIONS',
    headers: 'Content-Type',
  });

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    // Full portfolio data
    if (path === '/api/portfolio' || path === '/api/portfolio/') {
      try {
        const data = await getFullPortfolio(env.DB);
        return new Response(JSON.stringify(data), {
          headers: createJsonHeaders(corsHeaders),
        });
      } catch (error: any) {
        console.error('Error in getFullPortfolio:', error);
        return new Response(JSON.stringify({ 
          error: 'Failed to fetch portfolio data'
        }), {
          status: 500,
          headers: createJsonHeaders(corsHeaders),
        });
      }
    }

    // Personal info
    if (path === '/api/portfolio/personal') {
      const data = await getPersonalInfo(env.DB);
      return new Response(JSON.stringify(data), {
        headers: createJsonHeaders(corsHeaders),
      });
    }

    // Career
    if (path === '/api/portfolio/career') {
      const data = await getCareer(env.DB);
      return new Response(JSON.stringify(data), {
        headers: createJsonHeaders(corsHeaders),
      });
    }

    // Intro statements
    if (path === '/api/portfolio/intro-statements') {
      const data = await getIntroStatements(env.DB);
      return new Response(JSON.stringify(data), {
        headers: createJsonHeaders(corsHeaders),
      });
    }

    // General tendencies
    if (path === '/api/portfolio/general-tendencies') {
      const data = await getGeneralTendencies(env.DB);
      return new Response(JSON.stringify(data), {
        headers: createJsonHeaders(corsHeaders),
      });
    }

    // Hobbies
    if (path === '/api/portfolio/hobbies') {
      const data = await getHobbies(env.DB);
      return new Response(JSON.stringify(data), {
        headers: createJsonHeaders(corsHeaders),
      });
    }

    // Language skills
    if (path === '/api/portfolio/language-skills') {
      const data = await getLanguageSkills(env.DB);
      return new Response(JSON.stringify(data), {
        headers: createJsonHeaders(corsHeaders),
      });
    }

    // Basic abilities
    if (path === '/api/portfolio/basic-abilities') {
      const data = await getBasicAbilities(env.DB);
      return new Response(JSON.stringify(data), {
        headers: createJsonHeaders(corsHeaders),
      });
    }

    // Work skills
    if (path === '/api/portfolio/work-skills') {
      const data = await getWorkSkills(env.DB);
      return new Response(JSON.stringify(data), {
        headers: createJsonHeaders(corsHeaders),
      });
    }

    // Things to avoid
    if (path === '/api/portfolio/things-to-avoid') {
      const data = await getThingsToAvoid(env.DB);
      return new Response(JSON.stringify(data), {
        headers: createJsonHeaders(corsHeaders),
      });
    }

    // Current status
    if (path === '/api/portfolio/current-status') {
      const data = await getCurrentStatus(env.DB);
      return new Response(JSON.stringify(data), {
        headers: createJsonHeaders(corsHeaders),
      });
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  } catch (error) {
    console.error('Error handling portfolio route:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: createJsonHeaders(corsHeaders),
    });
  }
}
