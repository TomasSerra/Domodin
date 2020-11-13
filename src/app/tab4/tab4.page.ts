import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

var dolarOficialCompra: any;
var dolarOficialVenta: any;
var dolarBlueCompra: any;
var dolarBlueVenta: any;

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  peso: boolean = true;
  a: any = "$";
  tipo: any = "oficial";
  cantPlata: number;
  cambioTotal: number = 0;
  compra_venta: any = "compra";
  plataCambiar: number;

  constructor(public alertController: AlertController) 
  { 
    cambioDivisa();
  }

  ngOnInit() {
  }

  cambiar()
  {
    if(this.cantPlata == null || this.cantPlata == 0)
    {
      this.alerta();
      this.cambioTotal = 0;
    }
    else
    {
      this.plataCambiar = this.cantPlata + 0.0001;

    if(this.a == "$") // A PESOS
    {
      this.peso = true;
      if(this.tipo == "oficial") //OFICIAL
      {
        if(this.compra_venta == "compra") //COMPRA
        {
          this.cambioTotal = this.plataCambiar * dolarOficialCompra;
        }
        else //VENTA
        {
          this.cambioTotal = this.plataCambiar * dolarOficialVenta;
        }
      }
      else //BLUE
      {
        if(this.compra_venta == "compra") //COMPRA
        {
          this.cambioTotal = this.plataCambiar * dolarBlueCompra;
        }
        else //VENTA
        {
          this.cambioTotal = this.plataCambiar * dolarBlueVenta;
        }
      }
    }
    else // A DOLARES
    {
      this.peso = false;
      if(this.tipo == "oficial") //OFICIAL
      {
        if(this.compra_venta == "compra") //COMPRA
        {
          this.cambioTotal = this.plataCambiar / dolarOficialCompra;
        }
        else //VENTA
        {
          this.cambioTotal = this.plataCambiar / dolarOficialVenta;
        }
      }
      else //BLUE
      {
        if(this.compra_venta == "compra") //COMPRA
        {
          this.cambioTotal = this.plataCambiar / dolarBlueCompra;
        }
        else //VENTA
        {
          this.cambioTotal = this.plataCambiar / dolarBlueVenta;
        }
      }
    }
    this.cambioTotal = parseFloat(this.cambioTotal.toFixed(2));
    } 
  }

  async alerta()
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Por favor ingresa un monto',
      buttons: ['OK']
    });

    await alert.present();
  }



}

function cambioDivisa()
{
  fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
  .then(Response => Response.json())
  .then(data => {
    dolarOficialCompra = parseFloat(data[0].casa.compra) + (parseFloat(data[0].casa.compra) * 0.65);
    dolarOficialVenta = parseFloat(data[0].casa.venta) + (parseFloat(data[0].casa.venta) * 0.65);
    dolarBlueCompra = parseFloat(data[1].casa.compra);
    dolarBlueVenta = parseFloat(data[1].casa.venta);

  })
}
