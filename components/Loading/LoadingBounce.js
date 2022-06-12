import React from 'react';
import { ThreeBounce, Wave } from 'better-react-spinkit';

function LoadingBounce() {
  return (
    <div className="flex items-center justify-center h-screen">
        <ThreeBounce size={30} color='orange' />
    </div>
  )
}

export default LoadingBounce