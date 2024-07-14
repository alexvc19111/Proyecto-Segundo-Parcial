<template>
    <div class="content">
        <div class="title">
            <h2>SISTEMA DE</h2>
            <hr>
            <h2>CONTROL DE</h2>
            <hr>
            <h2>ASISTENCIA</h2>
            <hr>
            <p>Bienvenido/a a su solución <br>  definitiva para la gestión <br>eficiente de la asistencia <br> estudiantil. </p>
        </div>
        <div class="img">
            <img src="../assets/asistencia.webp" alt="">
        </div>
    </div>
</template>

<style scoped>
.content{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content .title{
  position: relative;
  max-width: 600px;
  padding-left: 30px;

}

.content .title h2{
  font-size: 3.5em;
  text-transform: uppercase;
  color: #504D24;
  line-height: 0.1;
  
}
.content .title p{
  font-size: 1.8em;
  line-height: 1.5;
  color: #504D24 ;
  font-weight: 600;
  margin-bottom: 20px;
}

.content .img{
  width: 500px;
  display: flex;
  justify-content: flex-end;
  padding-right: 50px;
  margin-top: -50px;

}

.content .img img{
  width: 490px;
}

</style>