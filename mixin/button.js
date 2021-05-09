export default {

  data() {
    return {
      btnLoading: false
    }
  },
  components: {},
  computed: {},
  mounted() {},
  created() {},
  methods: {
    setBtnLoading(time=5000) {
      this.btnLoading = true
      setTimeout(() => {
        this.btnLoading = false
      }, time)
    },

  },

}