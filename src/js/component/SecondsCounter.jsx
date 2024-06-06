// SecondsCounter.jsx

import React, { useState, useEffect } from "react"; //necesario para definir componentes en React.

/* useState para almacenar el estado de los segundos.
useEffect es decir,estamos diciendo a React, hay acciones que necesitan ocurrir después de que el componente se haya renderizado en el DOM, es decir, después de que el componente se haya mostrado en el navegador. (como la suscripción a eventos, el manejo de temporizadores o la solicitud de datos a un servidor.) 
En este caso, iniciar el contador cuando el componente se monta.*/

//Este código crea un componente SecondsCounter (variable), que muestra un contador de segundos junto con un icono de reloj. Utiliza Bootstrap para el diseño y Font Awesome para el icono del reloj.

/*d-flex: (display) para un contenedor flexible, Controlar el diseño y la alineación de los elementos secundarios, es decir, el icono y el display.
-justify-content-center: Centrados horizontalmente.
-align-items-center: alinearán verticalmente en el centro.
-bg-dark:(backgroundColor)contenedor negro.
-p-3: (padding) Esta clase de Bootstrap agrega un relleno de tamaño 3 (16px) alrededor de todos los lados del elemento. En este caso, se agregará un relleno de 16px alrededor del contenedor div.
-p-2: (Padding) Esta clase de Bootstrap aplica un relleno de tamaño 2 (8px) alrededor del elemento al que se aplica. En este caso, se está aplicando al contenedor que envuelve al icono del reloj. El relleno proporciona un espacio uniforme alrededor del icono.
-rounded:(borderRadius: "0.25rem") Esta clase de Bootstrap redondea las esquinas del elemento, dándole bordes suavizados. En este caso, el contenedor div tendrá esquinas redondeadas.*/

//ícono de reloj usando Font Awesome (fa fa-clock)
//fa-2x: Esta clase de Font Awesome establece el tamaño del icono al doble del tamaño predeterminado. El tamaño predeterminado de Font Awesome es 1x, por lo que fa-2x hace que el icono sea el doble de grande

//mostrar los segundos a través del display, mostramos los segundos pasados ​​como texto.
//String(props.seconds) convierte el número de segundos en una cadena de texto.
//.padStart(6, '0') Esto se utiliza para asegurarse de que el número de segundos siempre tenga al menos 6 dígitos


const SecondsCounter = () => {
  const [seconds, setSeconds] = useState(0); //Contador (segundos y el reinicio) a cero con useState 

  useEffect(() => { //el contador comienza a contar a partir del 1 s
    const intervalId = setInterval(() => { //SetInterval: ejecutar una función repetidamente después de un intervalo de tiempo especificado. Los argumentos que toma la función setInterval son  setSeconds y 1000 milisegundos.
      setSeconds(prevSeconds => prevSeconds + 1); //Esta es la función que queremos que setInterval ejecute repetidamente. La función a ejecutar es una función de flecha que actualiza el estado seconds, incrementándolo en 1 cada vez. Y el intervalo de tiempo es de 1000 milisegundos, lo que equivale a 1 segundo.
    }, 1000); //estamos pasando 1000 milisegundos, lo que equivale a 1 segundo.setSeconds se ejecutará cada segundo.

    //setSeconds es una función que se utiliza para actualizar el estado seconds en React.

    // Limpieza del intervalo para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="ContainerSecondsCounter d-flex justify-content-center align-items-center bg-dark text-white p-3 rounded">
      <div className="IcClock p-2">
        <i className="fa fa-clock fa-2x"></i>
      </div>
      <div className="Display p-2 display-4">{String(seconds).padStart(6, '0')}</div> 
    </div>
  );
};

export default SecondsCounter;


//exportamos el componente SecondsCounter para que pueda ser utilizado en otras partes de nuestra aplicación, en este caso, en home.jsx
