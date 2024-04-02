import { Elysia, t, type ElysiaConfig, type RouteSchema } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';

import * as database from '../../db/database.ts'

async function checkFrequencyValue(value: any) {
    if ((value == 'secondly' ||
        value == 'minutely' ||
        value == 'hourly' ||
        value == 'daily' ||
        value == 'weekly' ||
        value == 'monthly')) {
        return true
    }
    return false;
}

const app = new Elysia({ prefix: '/api' })
    .use(cors())
    .use(swagger())
    .onError(({ code, error, set }) => {
        if (code === 'NOT_FOUND') {
            set.status = 404;
            return 'Not found :('
        }
    })
    .get('/', () => ':3')

    /**
     * WE'RE DOING ANALYTICS!
     * Ok there's quite a lot of analytics I want to implement, so... gonna wait until the basics are done
     */
    .get('/analytics/last/:range/:period/:frequency', async ({
        params, set
    }: {
        params: {
            range: number,
            period: string
            frequency: string
        }; set: {
            status: number,
        }
    }) => {
        if (params.range <= 0) {
            set.status = 404;
            return {
                success: false,
                error: 'range is less than or equal to 0'
            }
        }
        if (!(params.period == 'seconds' ||
            params.period == 'minutes' ||
            params.period == 'hours' ||
            params.period == 'days' ||
            params.period == 'weeks' ||
            params.period == 'months')) {
            set.status = 404;
            return {
                success: false,
                error: 'period must be one of these values: seconds, minutes, hours, days, weeks, months'
            }
        }

        if (!(await checkFrequencyValue(params.frequency))) {
            set.status = 404;
            return {
                success: false,
                error: 'frequency must be one of these values: secondly, minutely, hourly, daily, weekly, monthly'
            }
        }

        set.status = 501;
        return {
            success: false,
            error: 'Not implemented. You have valid parameters, however we are unable to respond successfully'
        }
    })
    .get('/analytics/range/:start/:end/:frequency', async ({ set }) => {
        set.status = 501;
        return {
            success: false,
            error: 'Not implemented'
        }
    })
    .get('/analytics/day/:date/:frequency', async ({ set }) => {
        set.status = 501;
        return {
            success: false,
            error: 'Not implemented'
        }
    })
    .get('/analytics/month/:month/:frequency', async ({ set }) => {
        set.status = 501;
        return {
            success: false,
            error: 'Not implemented'
        }
    })
    .get('/analytics/year/:year/:frequency', async ({ set }) => {
        set.status = 501;
        return {
            success: false,
            error: 'Not implemented'
        }
    })
    .get('/analytics/raw', async ({ set }) => {
        set.status = 501;
        return {
            success: false,
            error: 'Not implemented'
        }
    })
    .get('/clicks', async () => { return { clicks: parseInt(await database.getClicks()) } })
    .get('/clicked', async () => { database.increaseClicks(); return { clicked: true } })

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;