import React from 'react';
import { Tracer, ExplicitContext, BatchRecorder, jsonEncoder, Annotation } from 'zipkin';
import { HttpLogger } from 'zipkin-transport-http';
import wrapFetch from 'zipkin-instrumentation-fetch';
const { JSON_V2 } = jsonEncoder

export const tracer = new Tracer({
  ctxImpl: new ExplicitContext(),
  recorder: new BatchRecorder({
    logger: new HttpLogger({
      endpoint: '/tracing',
      jsonEncoder: JSON_V2,
      fetch,
    }),
  }),
  localServiceName: 'sre-webinar-app-frontend',
});


