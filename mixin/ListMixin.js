export default {

    data() {
        return {
            dataList:[],
            pageSize:10,
            pageNum:1,
            noData:false,
            finish:false,
            loading:true,

        }
    },
    components: {},
    computed: {},
    mounted() {
    },
    created() {
    },
    methods: {
        initData(){
            this.dataList = []
            this.pageNum = 1
            this.noData = false
            this.finish = false
            this.loading = true
        },
        dealList(list,number = 0){
            this.loading = false
            this.pageNum++
            this.noData = false
			if(number === 1) {
				this.dataList = list
			}else {
				this.dataList = this.dataList.concat(list)
			}

            if(this.dataList.length===0){
                this.noData = true

            }
            if (list.length < this.pageSize){
                this.finish = true
            }
        }
    },
    onReachBottom() {
        if (this.finish){ return}
        this.getDataList()
    },
}
