<template>
  <div class="container">
    <div class="list-wrap">
      <vo-pages :data="list"
                @pullingUp="pullingUp"
                @pullingDown="pullingDown"
                :loadedAll="loadedAll">
        <ul class="article-list">
          <li class="article"
              v-for="article in list"
              :key="article.id">
            <div class="left">
              <img v-lazy="article.imageUri"
                   alt="thumb" />
            </div>
            <div class="right">
              <p>{{ article.title }}</p>
              <p class="more-info">
                <span class="author">作者：{{ article.author }}</span>
                <span class="time">发布时间：{{article.displayTimeFormart}}</span>
              </p>
            </div>
          </li>
        </ul>
      </vo-pages>
    </div>
    <footer-tabbar/>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'
import { fetchList } from 'api/article'
import dayjs from 'dayjs'
import FooterTabbar from 'components/FooterTabbar'
import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
export default {
  name: 'Article',
  data () {
    return {
      active: 1,
      list: [],
      total: 0,
      page: 1,
      loadedAll: false
    }
  },
  mounted () {
    this.getList()
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    VoPages,
    FooterTabbar
  },
  methods: {
    pullingDown () {
      this.beforePullDown = false
      this.page = 1
      this.getList(false)
    },
    pullingUp () {
      this.page += 1
      this.getList()
    },
    async getList (loadMore = true) {
      const data = {
        page: this.page
      }
      const result = await fetchList(data)
      this.total = result.data.total
      const newList = result.data.items.map(article => {
        article.displayTimeFormart = dayjs(article.display_time).format('YYYY-MM-DD')
        return article
      })
      if (loadMore) {
        this.list = this.list.concat(newList)
      } else {
        this.list = newList
      }
      if (!this.beforePullDown) {
        this.beforePullDown = true
      }
      this.loadedAll = this.total <= this.list.length
    }
  }
}
</script>
<style lang="scss" scoped>
p{
  margin-block-start: 0;
  margin-block-end: 0;
}
.container{
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  .list-wrap{
    height: calc(100% - 50px);
    overflow-y: hidden;
  }
}

.article-list {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 15px 15px 0;
  .article {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px 15px;
    box-sizing: border-box;
    background: #FFF;
    border-radius: 5px;
    box-shadow: 0 0 6px #e3e3e3;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right {
      padding-left: 15px;
      box-sizing: border-box;
      display: flex;
      width: 235px;
      height: 80px;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
      p {
        width: 100%;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
      }
      .more-info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #666;
      }
    }
  }
}

</style>
