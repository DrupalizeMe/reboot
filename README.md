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
