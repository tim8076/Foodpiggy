(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-95b84882"],{"0eca":function(t,e,o){t.exports=o.p+"img/cover.e0a4c2c3.jpg"},"306e":function(t,e,o){"use strict";o.r(e);var a=o("7a23"),c={class:"page-favorites"},s=Object(a["h"])("h2",{class:"display-5 text-primary p-3 bg-secondary"},"您的收藏店家",-1),i=[s],r={class:"container"},n=Object(a["h"])("h2",{class:"mb-3 fw-normal"},"餐廳列表",-1),l={class:"row"};function p(t,e,s,p,b,d){var h=Object(a["J"])("BaseCardShop");return Object(a["B"])(),Object(a["g"])("div",c,[Object(a["h"])("div",{class:"jumbotron bg-cover d-flex justify-content-center align-items-center mb-12",style:Object(a["t"])({backgroundImage:"url(".concat(o("0eca"),")")})},i,4),Object(a["h"])("div",r,[n,Object(a["h"])("div",l,[(Object(a["B"])(!0),Object(a["g"])(a["a"],null,Object(a["H"])(d.favoriteShops,(function(t){return Object(a["B"])(),Object(a["g"])("div",{key:t,class:"col-md-4 col-lg-3 mb-6"},[Object(a["k"])(h,{shop:t,isFavoritePage:!0,onAddFavorite:d.addToFavorite,onRemoveFavorite:d.removeFavorite},null,8,["shop","onAddFavorite","onRemoveFavorite"])])})),128))])])])}var b=o("5530"),d=(o("4de4"),o("caad"),o("2532"),o("5502")),h=o("b23e"),u={components:{BaseCardShop:h["a"]},computed:Object(b["a"])(Object(b["a"])(Object(b["a"])({},Object(d["e"])("localStorage",["favoriteProducts"])),Object(d["c"])("frontProducts",["shopList"])),{},{favoriteShops:function(){var t=this;return this.shopList.filter((function(e){return t.favoriteProducts.includes(e.shop.title)}))}}),methods:Object(b["a"])(Object(b["a"])(Object(b["a"])(Object(b["a"])({},Object(d["b"])("localStorage",["getFavoriteProducts"])),Object(d["d"])("localStorage",["ADD_Favorite_Products","REMOVE_Favorite_Products"])),Object(d["b"])("frontProducts",["getAllProducts"])),{},{addToFavorite:function(t){this.ADD_Favorite_Products({title:t})},removeFavorite:function(t){this.REMOVE_Favorite_Products({title:t})}}),created:function(){this.getAllProducts(),this.getFavoriteProducts()}},v=o("6b0d"),j=o.n(v);const O=j()(u,[["render",p]]);e["default"]=O},b23e:function(t,e,o){"use strict";var a=o("7a23"),c={class:"card card__shop"},s=Object(a["h"])("i",{class:"far fa-heart"},null,-1),i=[s],r=Object(a["h"])("i",{class:"fas fa-heart"},null,-1),n=[r],l={class:"overflow-hidden position-relative rounded-3 mb-2"},p=["src","alt"],b={class:"position-absolute top-0 start-0 pt-3 fs-6 text-white"},d={key:0,class:"ps-3 py-1 pe-3 mb-3 bg-thirdly"},h={key:1,class:"ps-3 py-1 pe-3 mb-3 p-1 bg-primary"},u={class:"card-body p-0"},v={class:"d-flex justify-content-between align-items-center"},j={class:"card-title fs-4"},O={class:"me-2"},f=Object(a["h"])("i",{class:"fas fa-star text-thirdly"},null,-1),g={class:"card-text fw-light text-gray-dark"};function m(t,e,o,s,r,m){var y=Object(a["J"])("router-link");return Object(a["B"])(),Object(a["g"])("div",c,[Object(a["k"])(y,{class:"link",to:{name:"indexshop",params:{shop:m.shopData.title}}},null,8,["to"]),Object(a["W"])(Object(a["h"])("a",{href:"#",class:"heart position-absolute top-5 end-5 fs-4 text-primary z-index-1000",onClick:[e[0]||(e[0]=Object(a["Y"])((function(){return m.addToFavorite&&m.addToFavorite.apply(m,arguments)}),["stop","prevent"])),e[1]||(e[1]=Object(a["Y"])((function(){return m.toggleActive&&m.toggleActive.apply(m,arguments)}),["prevent"]))]},i,512),[[a["S"],!r.active]]),Object(a["W"])(Object(a["h"])("a",{href:"#",class:"heart position-absolute top-5 end-5 fs-4 text-primary z-index-1030",onClick:[e[2]||(e[2]=Object(a["Y"])((function(){return m.removeFavorite&&m.removeFavorite.apply(m,arguments)}),["stop","prevent"])),e[3]||(e[3]=Object(a["Y"])((function(){return m.toggleActive&&m.toggleActive.apply(m,arguments)}),["prevent"]))]},n,512),[[a["S"],r.active]]),Object(a["h"])("div",l,[Object(a["h"])("img",{src:m.shopData.imageUrl,class:"card-img-top",alt:m.shopData.title},null,8,p),Object(a["h"])("div",b,[o.shop.is_superior?(Object(a["B"])(),Object(a["g"])("p",d," 特選店家 ")):Object(a["f"])("",!0),o.shop.isNew?(Object(a["B"])(),Object(a["g"])("p",h," 新餐廳 ")):Object(a["f"])("",!0)])]),Object(a["h"])("div",u,[Object(a["h"])("div",v,[Object(a["h"])("h3",j,Object(a["M"])(m.shopData.title),1),Object(a["h"])("p",O,[f,Object(a["j"])(" "+Object(a["M"])(m.shopData.star),1)])]),Object(a["h"])("p",g,Object(a["M"])(o.shop.shop.price)+" "+Object(a["M"])(o.shop.category)+" , "+Object(a["M"])(o.shop.subCategory),1)])])}var y={props:{shop:{type:Object,default:function(){return{}}},isFavoritePage:{type:Boolean,default:!1}},data:function(){return{active:!1}},computed:{shopData:function(){return this.shop.shop}},watch:{isFavoritePage:{immediate:!0,handler:function(){this.isFavoritePage&&(this.active=!0)}}},methods:{addToFavorite:function(){this.$emit("addFavorite",this.shop.shop.title),this.$_swal("已加入收藏清單")},removeFavorite:function(){this.$emit("removeFavorite",this.shop.shop.title),this.$_swal("已從收藏清單移除")},toggleActive:function(){this.active=!this.active}}},F=o("6b0d"),w=o.n(F);const P=w()(y,[["render",m]]);e["a"]=P}}]);
//# sourceMappingURL=chunk-95b84882.4a2feac0.js.map