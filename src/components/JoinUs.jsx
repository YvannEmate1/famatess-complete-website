import React from 'react';
import { C } from '../theme';
import useInView from '../utils/useInView';

export default function JoinUs() {
  const [ref] = useInView(0.2);

  return (
    <section ref={ref} style={{ background: C.orange }}>
      <h2>Join Our Team</h2>
    </section>
  );
}