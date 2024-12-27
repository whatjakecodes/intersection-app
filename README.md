# Intersection

## About

Simulate traffic through an intersection

### Timer Ticks
Ticks increase by 1 per second by default. Traffic Lights update accordingly:

1. Seconds 0-40 allow North/South Traffic
2. Seconds 41-80 allow East/West Traffic
3. N/S left turn lanes enable from 31-40s
4. E/W left turn lanes enable from 71-80s
5. All lanes get 3 ticks of yellow light before a red light

Add cars to each lane by clicking the Plus button by that lane.

### Each Road's lanes are labeled according:
* R = Right Turn Lane
* L = Left Turn Lane
* Mo = Middle Outgoing Lane
* Mi = Middle Incoming Lane


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
