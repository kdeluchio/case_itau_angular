import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFundo } from 'src/app/Shared/interfaces/IFundo';
import { ISetFundo } from 'src/app/Shared/interfaces/ISetFundos';
import { ITipoFundo } from 'src/app/Shared/interfaces/ITipoFundo';
import { FundoService } from 'src/app/Shared/services/fundo.service';

@Component({
  selector: 'app-fundos-list',
  templateUrl: './fundos-list.component.html',
  styleUrls: ['./fundos-list.component.css']
})
export class FundosListComponent implements OnInit  {

  tiposFundo : ITipoFundo[]; 
  myFundoList: IFundo[];
  updateFundo: FormGroup;
  showAlert = false;
  message = '';
  typeAlert = '';
  loading = false;
  updateMode = false;
  createMode = false;
  movPatMode = false;

  constructor(private formBuilder: FormBuilder,
              private fundoService: FundoService) { }

  ngOnInit(): void {

    this.updateFundo = this.formBuilder.group({
      codigo:  [''],
      nome:  [''],
      cnpj:  [''],
      codigoTipo:  [0],
      patrimonio:  [0]
    });

    this.tiposFundo = this.fundoService.GetTiposFundo();
    this.readFundos();
  }

  newMode() {

    this.createMode = true;
    this.updateMode = false;
    this.movPatMode = false;
    this.updateFundo.setValue({
      codigo : '',
      cnpj : '',
      nome : '',
      codigoTipo : 0,
      patrimonio : 0
    });
  }

  new() {

    const setFundo: ISetFundo = {
      codigo : this.updateFundo.get('codigo').value,
      cnpj : this.updateFundo.get('cnpj').value,
      nome : this.updateFundo.get('nome').value,
      codigoTipo : Number(this.updateFundo.get('codigoTipo').value),
    };

    this.loading = true;
    this.showAlert = false;
    this.message = '';

    if (!this.updateFundo.valid) {
      this.typeAlert = 'danger';
      this.loading = false;
      return;
    }
    
    this.fundoService.Create(setFundo).subscribe(data => {

      if(data.status == 'Success'){
        this.updateFundo.get('codigo').setValue('');
        this.updateFundo.get('cnpj').setValue('');
        this.updateFundo.get('nome').setValue('');
        this.updateFundo.get('codigoTipo').setValue(0);
  
        this.typeAlert = 'success';
        this.showAlert = true;
        this.message = 'Fundo inserido com sucesso';
        this.loading = false;
        this.createMode = false;
        this.readFundos();

      } else{
        this.erroMode(data.message);
      }

    }, exception => { 
      console.log(exception)

      this.erroMode(exception.error )
    });
  }

  editMode(item: IFundo) {

    this.createMode = false;
    this.updateMode = true;
    this.movPatMode = false;
    this.updateFundo.setValue({
      codigo : item.codigo,
      cnpj : item.cnpj,
      nome : item.nome,
      codigoTipo : item.codigoTipo,
      patrimonio : item.patrimonio
    });
  }

  edit() {

    const setFundo: ISetFundo = {
      codigo : this.updateFundo.get('codigo').value,
      cnpj : this.updateFundo.get('cnpj').value,
      nome : this.updateFundo.get('nome').value,
      codigoTipo : Number(this.updateFundo.get('codigoTipo').value),
    };

    this.loading = true;
    this.showAlert = false;
    this.message = '';

    if (!this.updateFundo.valid) {
      this.typeAlert = 'danger';
      this.loading = false;
      return;
    }
    
    this.fundoService.Update(setFundo).subscribe(data => {

      if(data.status == 'Success'){
        this.updateFundo.get('codigo').setValue('');
        this.updateFundo.get('cnpj').setValue('');
        this.updateFundo.get('nome').setValue('');
        this.updateFundo.get('codigoTipo').setValue(0);
  
        this.typeAlert = 'success';
        this.showAlert = true;
        this.message = 'Fundo editado com sucesso';
        this.loading = false;
        this.updateMode = false;
        this.readFundos();

      } else{
        this.erroMode(data.message);
      }

    }, exception => { 
      console.log(exception)

      this.erroMode(exception.error )
    });
  }

  movMode(item: IFundo){

    this.createMode = false;
    this.updateMode = false;
    this.movPatMode = true;
    this.updateFundo.setValue({
      codigo : item.codigo,
      cnpj : '',
      nome : '',
      codigoTipo : 0,      
      patrimonio : 0
    });

  }

  movPat(){
    const codigo = this.updateFundo.get('codigo').value;
    const patrimonio = Number(this.updateFundo.get('patrimonio').value);

    this.loading = true;
    this.showAlert = false;
    this.message = '';
    
    this.fundoService.MovimentarPatrimonio(codigo, patrimonio).subscribe(data => {

      if(data.status == 'Success'){
        this.updateFundo.get('codigo').setValue('');
        this.updateFundo.get('patrimonio').setValue(0);
  
        this.typeAlert = 'success';
        this.showAlert = true;
        this.message = 'Fundo editado com sucesso';
        this.loading = false;
        this.movPatMode = false;
        this.readFundos();

      } else{
        this.erroMode(data.message);
      }

    }, exception => { 
      console.log(exception)

      this.erroMode(exception.error )
    });
  }

  remove(codigo: string) {
    this.createMode = false;
    this.updateMode = false;
    this.movPatMode = false;
    this.loading = true;
    this.showAlert = false;
    this.message = '';

    this.fundoService.Remove(codigo).subscribe(data => {

      if(data.status == 'Success'){
  
        this.typeAlert = 'success';
        this.showAlert = true;
        this.message = 'Fundo apagado com sucesso';
        this.loading = false;
        this.readFundos();

      } else{
        this.erroMode(data.message);
      }

    }, exception => { 
      this.erroMode(exception.error )
    });
  }

  movimentar(){

  }

  erroMode(errorMsg : string ){
    this.typeAlert = 'danger';
    this.showAlert = true;
    this.message = errorMsg;
    this.loading = false;
  }

  readFundos() {
    this.fundoService.GetAllFundos().subscribe(data => {
      this.myFundoList = data.result;
    });
  }

  cancel(){
    this.createMode = false;
    this.updateMode = false;
    this.movPatMode = false;
  }

  closeMsg() {
    this.message = '';
  }

}
