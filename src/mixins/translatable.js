export default {
  data () {
    return {
      parallax: null,
      parallaxDist: null,
      elOffsetTop: null,
      percentScrolled: null,
      scrollTop: null,
      windowHeight: null,
      windowBottom: null
    }
  },

  computed: {
    normalizedHeight () {
      return Number(this.height.toString().replace(/(^[0-9]*$)/, '$1'))
    },

    imgHeight () {
      return this.objHeight()
    }
  },

  mounted () {
    this.$vuetify.load(this.init)
  },

  beforeDestroy () {
    document.removeEventListener('scroll', this.translate, false)
    document.removeEventListener('resize', this.translate, false)
  },

  methods: {
    listeners () {
      document.addEventListener('scroll', this.translate, false)
      document.addEventListener('resize', this.translate, false)
    },

    translate () {
      this.calcDimensions()

      this.percentScrolled = (
        (this.windowBottom - this.elOffsetTop) / (this.normalizedHeight + this.windowHeight)
      )
      
      this.parallax = Math.round(this.parallaxDist * this.percentScrolled)

      if (this.translated) {
        this.translated()
      }
    },

    calcDimensions () {
      let offset = this.$el.getBoundingClientRect()

      this.scrollTop = window.pageYOffset
      this.parallaxDist = this.imgHeight - this.normalizedHeight
      this.elOffsetTop = offset.top + this.scrollTop
      this.windowHeight = window.innerHeight
      this.windowBottom = this.scrollTop + this.windowHeight
    }
  }
}