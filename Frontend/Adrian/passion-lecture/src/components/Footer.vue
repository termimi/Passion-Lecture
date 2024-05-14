<template>
    <footer>
      <div class="footer-info">
        
        <div class="footerContact">
            <h2>Contact</h2>
            <p>+41 079 787 35 14</p>
            <p>pd47qky@eduvaud.ch</p>
        </div>
        <div class="footerRights">
                <p>2024 LovBooks All rights Reserved</p>
                <p>Site Web créé par Botteau Mathis & Toledo Adrian</p>
        </div>
            
      </div>
    </footer>
  </template>

  <script>
export default{
    name : 'Footer',
}
</script>

<style scoped>
footer{
    background-color: #504c64;
    color: #fff ;
    padding: 20px;
    position:relative;
    bottom: 0;
    left: 0;
    width: 100%;
}
.footer-info{
    max-width: 1200px;
    margin: 0 auto;
    
}
.footerContact{
    width: 100%;
}

.footerRights{
    display: flex;
    justify-content: space-between;
}

</style>