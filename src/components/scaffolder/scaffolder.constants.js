'use strict';

angular
  .module('iframeScaffolder')
    .constant('SCAFFOLDER', {
      state: {
        params: {
          urls: { value: ''},
          active: { value: '0'},
          sharing: { value: '1'},
          autoplay: { value: '0'},
          loop: { value: '1'},
          layout: { value: 'menu'},
          theme: { value: 'default'},
          title: { value: null},
          description: { value: null}
        }
      },
      layouts: {
        vertical: ['menu'],
        horizontal: ['tabs', 'narrative'],
        splitted: ['horizontal', 'head', 'tail'],
        togglable: ['menu', 'tabs', 'narrative']
      },
      shortener: '//white-shortener.herokuapp.com',
      width: 600,
      height: 450,
      themes: [
        { slug: 'default', label: 'Default' },
        { slug: 'blue-grey', label: 'Blue grey' },
        { slug: 'pink', label: 'Pink' },
        { slug: 'grey', label: 'Grey' },
        { slug: 'blue', label: 'Blue' },
        { slug: 'indigo', label: 'Indigo' },
        { slug: 'red', label: 'Red' },
        { slug: 'deep-orange', label: 'Deep orange' },
        { slug: 'yellow', label: 'Yellow' },
        { slug: 'teal', label: 'Teal' },
        { slug: 'green', label: 'Gree' }
      ]
    });
