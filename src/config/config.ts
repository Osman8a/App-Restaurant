import swal from 'sweetalert2'

export class Alertas {
    constructor() {
    }

    mostrarAlertaConTimpo(titulo, tiempo) {
        return swal({
            title: titulo,
            text: '',
            timer: tiempo,
            onOpen: () => {
                swal.showLoading()
            }
        })
    }

    mostrarAlertaSimple(titulo, mensaje, tipo) {
        swal(
            titulo,
            mensaje,
            tipo
        )
    }

    mostrarAlertaSimpleconTiempo(tipo, titulo, tiempo) {
        swal({
            position: 'top-end',
            type: tipo,
            title: titulo,
            showConfirmButton: false,
            timer: tiempo
        })
    }
}
