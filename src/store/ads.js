import * as firebase from 'firebase'

class Ad {
    constructor(title, description, ownerId, imageSrc = '', promo = false, id = null){
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
        this.imageSrc = imageSrc;
        this.promo = promo;
        this.id = id
    }
}

export default {
    state: {
        ads: [
            {
                title: 'First ad',
                description: 'Hello, I am descr',
                promo: false,
                imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                id: '123'

            },
            {
                title: 'Second ad',
                description: 'Hello, I am descr',
                promo: true,
                imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                id: '1234'

            },
            {
                title: 'Third ad',
                description: 'Hello, I am descr',
                promo: true,
                imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                id: '12345'

            }
        ]
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload)
        }
    },
    actions: {
        async createAd({commit, getters}, payload){
            commit('clearError')
            commit('setLoading', true)

            try {
                const newAd = new Ad(
                    payload.title,
                    payload.description,
                    getters.user.id,
                    payload.imageSrc,
                    payload.promo
                )
               const fbValue = await firebase.database().ref('ads').push(newAd)
                console.log(fbValue)
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        }
    },
    getters: {
        ads(state) {
            return state.ads
        },
        promoAds(state) {
            return state.ads.filter(ad => {
                return ad.promo
            })
        },
        myAds(state) {
            return state.ads
        },
        AdById(state) {
            return adId => {
                return state.ads.find( ad=> ad.id === adId )
            }
        }
    }
}
