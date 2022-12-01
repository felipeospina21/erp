import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from '@/server/utils/session';

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);
  const { user } = session;

  if (!user?._id) {
    return new NextResponse(null, { status: 403 }); // unauthorized to see pages inside admin/
  }

  return res;
};

export const config = {
  /*  
    Match all paths except: 
    /login 
    /api/user/login
    _next/*
    favicon.ico
  */
  matcher: ['/((?!login|api/user/login|_next/*|favicon.ico).*)'],
};
