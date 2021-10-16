<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['swal', 'swalConfirm']),
  },
  watch: {
    swal: {
      deep: true,
      handler() {
        if (this.swal.active) {
          this.$_swal(this.swal.message, this.swal.icon);
          this.$store.commit('SET_SWAL_ACTIVE', false);
        }
      },
    },
    swalConfirm: {
      deep: true,
      handler() {
        if (this.swalConfirm.active) {
          this.$_swalComfirm(this.swalConfirm.message);
          this.$store.commit('SET_SWAL_CONFIRM_ACTIVE', false);
        }
      },
    },
  },
  methods: {
    $_swal(msg, icon = 'success') {
      let showButtons = false;
      let time = 1800;
      let timerProgressBar = true;
      let toast = true;
      if (icon === 'error') {
        showButtons = true;
        time = false;
        toast = false;
        timerProgressBar = false;
      }
      this.$swal({
        icon,
        title: msg,
        toast,
        position: 'top',
        showConfirmButton: showButtons,
        confirmButtonColor: '#ff007e',
        timer: time,
        timerProgressBar,
        imageUrl: '',
      });
    },
    // 確認對話框
    $_swalComfirm(msg) {
      return this.$swal({
        title: msg,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#ff007e',
        reverseButtons: true,
        icon: 'warning',
      });
    },
  },
};
</script>
