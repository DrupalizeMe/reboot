This repository contains demo code used during the [Drupalize.Me](https://drupalize.me) *Theming Drupal 8* workshop.

## Layout Builder example

Some of the example code here is for an example of how to use Layout Builder + View modes for a component like theming system. And, while a theme doesn't really have configuration like a module does, we provde some config files for a landing_page content type to scaffold this example.

This is an example implementation of this pattern: https://drupalize.me/tutorial/implement-layout-builder-view-modes-pattern?p=3398

Make sure these modules are all enabled:

```shell
drush en -y ctools_block layout_builder link media media_library responsive_image
```

You can try and import the landing page content type from the config in this theme, but it might not work:

```sh
drush cim --partial --source=themes/reboot/config/install/
```

## Compiling CSS and TypeScript with Parcel

It's common to want to use a tool like Sass, or PostCSS when writing your theme's CSS. Or to use a JavaScript/TypeScript compiler when writing modern JavaScript code. This project contains an example of how to use [Parcel](parceljs.org) to handle bundling of CSS and JavaScript assets. The general concept is the same regardless of what tooling you use:

 - Install and setup the tooling as you would for any project
 - Update your theme's _.libraries.yml_ file so that it points to the production ready output from your tool(s) of choice.
 - Write your CSS/JS and use your tooling to compile the final assets. Then commit those to the theme.

This example will compile the SCSS file in scss/styles.scss, and the TypeScript code in js/typescript-example/index.ts into the _dist/_ directory. See _reboot.libraries.yml_ as well.

To use the example here:

```sh
npm install
# Build production assets from scss/styles.scss and js/typescript-example/index.js
npm run build
```

This example uses Parcel because it's relatively easy to set up, and v2 has a built in proxy server that we can use during development so that things like hot-module-replacement and CSS live reloading work. For this, you'll need to:

- Configure the Parcel proxy to point to your Drupal site on your localhost. See _.proxyrc_
- Configure Drupal to work with a reverse proxy. See _settings.php_ changes below.
- Start the dev server, and then visit your site via the dev server.

To start a dev server with hot module reloading. You'll need to edit .proxyrc to point to your Drupal site. And, add something like the following to your Drupal site's _settings.local.php_:

```php
if (isset($_SERVER['REMOTE_ADDR'])) {
  $settings['reverse_proxy'] = TRUE;
  $settings['reverse_proxy_addresses'] = [$_SERVER['REMOTE_ADDR']];
}
```

You'll also want to disable CSS/JS aggregation on your Drupal development environment's _settings.local.php_:

```php
/**
 * Disable CSS and JS aggregation.
 */
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
```

Once that's done you can start the development server, and visit your site from the URL the following command outputs:

```sh
npm run dev
```

When you visit the dev server any request to load a file in the _dist/_ directory will be handled by the Parcel dev server. When you edit a SCSS file Parcel will automatically rebuild it and reload the file in your browser. Any requests for assets, including routes like `GET /node/42`, not in the _dist/_ directory handled by Parcel will be sent to the Drupal development environment so you can still view your site like usual.
