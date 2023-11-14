// Do not write code directly here, instead use the `src` folder!

// What you should do here is re-exports all the things you want your user to access, ex:
// export { HelloWorld } from "./src/main.ts"
// export type { HelloWorldResult } from "./src/types.ts"

import Debug from './src/Debug.astro';
import CircleAnimation from './src/CircleAnimation.astro';
import Carousel from './src/Carousel.astro';
import CarouselNav from './src/CarouselNav.astro';

export { Debug, CircleAnimation, Carousel, CarouselNav };
