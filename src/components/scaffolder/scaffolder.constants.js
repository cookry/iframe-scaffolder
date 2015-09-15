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
      height: 450
    });