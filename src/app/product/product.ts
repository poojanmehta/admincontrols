export class product{
  constructor(
    public p_id:string,
    public p_name:string,
    public p_price:number,
    public p_dis:string,
    public p_qty:number,
    public p_stock:number,
    public p_ben:String,
    public p_img:string,
    public fk_sct_id:string,
  ){}
}
