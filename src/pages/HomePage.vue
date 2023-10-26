<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <h1>Gifts</h1>
      </div>
    </section>
    <section class="row">
      <div class="col-4">
        <h3>Create Gift</h3>
        <form>
          <label for="name">name of gift:</label>
          <div>
            <input type="text" placeholder="gift name..." maxlength="50" minlength="1" required>
          </div>
          <label for="picture">picture of gift:</label>
          <div>
            <input type="url" placeholder="picture url..." maxlength="500">
          </div>
          <button class="btn btn-success">Submit</button>
        </form>
      </div>
      <div class="col-8">
        <div class="row">
          <div v-for="gift in   gifts  " :key="gift.id" class="col-4">

            <div class="bg-secondary">
              <img :src="gift.url" :alt="gift.tag" class="img-fluid">
              <p class=" text-center text-white">{{ gift.tag }}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, popScopeId } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { giftsService } from '../services/GiftsService';
import { AppState } from "../AppState"

export default {
  setup() {

    async function getGifts() {
      try {
        await giftsService.getGifts()
      } catch (error) {
        Pop.error(error, '[getting gifts]')

      }
    }

    onMounted(() => {
      logger.log('home page mounted')
      getGifts()
    })

    onUnmounted(() => {
      logger.log('home page unmounted')
    })
    return {
      gifts: computed(() => AppState.gifts)
    }
  }
}
</script>

<style scoped lang="scss">
img {
  height: 20vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
