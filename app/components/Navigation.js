import each from 'lodash/each'

import Component from 'classes/Component'
import { random } from 'utils/math'

export default class extends Component {
  constructor ({ canvas, url }) {
    super({
      classes: {
        linksActive: 'navigation__link--active'
      },
      element: '.navigation',
      elements: {
        links: '.navigation__link',
        easter: '.navigation__easter'
      }
    })

    this.canvas = canvas

    this.homeBottom = document.querySelector('.home__background__bottom')
    this.homeTop = document.querySelector('.home__background__top')
    this.aboutGallery = document.querySelector('.about__gallery')

    this.onChange(url)
  }

  /**
   * Events.
   */
  onChange (url) {
    each(this.elements.links, link => {
      const value = link.href.replace(window.location.origin, '')

      if (url === value) {
        link.classList.add(this.classes.linksActive)
      } else {
        link.classList.remove(this.classes.linksActive)
      }
    })
  }


  onEasterEgg () {


    const background = 'rgb(245 245 245)'

    const currentBackground = document.documentElement.style.background.replace('rgb(', '').replace(')', '').replace(/ /g, '').split(',')
    console.log(currentBackground)


    document.documentElement.style.background = background

    this.homeBottom.style.background = `linear-gradient(to bottom, transparent 0%, ${background} 100%)`
    this.homeTop.style.background = `linear-gradient(to bottom, ${background} 0%, transparent 100%)`
    this.aboutGallery.style.color = background


    const canvas = document.documentElement.style.background.replace('rgb(', '').replace(')', '').replace(/ /g, '').split(',')

    if (currentBackground[0] == '245' ) {
        console.log('light')
      }
    else{
      console.log('dark')
    }

    if (this.canvas && currentBackground[0] == '245' ) {
        this.canvas.background = {
              r: 0,
              g: 0,
              b: 0
            }
        document.documentElement.style.background = 'rgb(0 0 0)'
        document.body.classList.toggle("dark-mode");
        this.aboutGallery.style.color = 'rgb(0 0 0)'
      }
      else{
        this.canvas.background = {
              r: 245,
              g: 245,
              b: 245
            }
        document.body.classList.toggle("dark-mode");
      }
  }



  // onEasterEgg () {
  //
  //   const value = random(0, 360, 0.01)
  //   const background = `hsl(${value}deg 99% 99%)`
  //
  //   document.documentElement.style.background = background
  //
  //   this.homeBottom.style.background = `linear-gradient(to bottom, transparent 0%, ${background} 100%)`
  //   this.homeTop.style.background = `linear-gradient(to bottom, ${background} 0%, transparent 100%)`
  //   this.aboutGallery.style.color = background
  //
  //   const canvas = document.documentElement.style.background.replace('rgb(', '').replace(')', '').replace(/ /g, '').split(',')
  //
  //   if (this.canvas) {
  //     this.canvas.background = {
  //       r: canvas[0],
  //       g: canvas[1],
  //       b: canvas[2]
  //     }
  //   }
  // }

  /**
   * Listeners.
   */
  addEventListeners () {
    this.elements.easter.addEventListener('click', this.onEasterEgg)
  }
}
