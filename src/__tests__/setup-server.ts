import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const SUPABASE_URL = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;

const getTest = () => {
  return http.get(`${SUPABASE_URL}/rest/v1`, () => HttpResponse.json({}));
};

const handlers = [getTest()];

export const server = setupServer(...handlers);
