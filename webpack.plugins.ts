import { EnvironmentPlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
// eslint-disable-next-line import/default
import CopyPlugin from 'copy-webpack-plugin';

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new EnvironmentPlugin({
    APP_ENV: process.env.APP_ENV || process.env.NODE_ENV,
  }),
  new CopyPlugin({
    patterns: [
      {
        from: 'icons',
        to: 'icons',
      }
    ]
  })
];