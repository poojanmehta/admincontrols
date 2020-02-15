export class product {
  constructor(
    public p_id: number,
    public p_name: string,
    public p_price: number,
    public p_dis: string,
    public p_qty: number,
    public p_unit: number,
    public p_stock: number,
    public p_ben: String,
    public p_usage: string,
    public p_img: string,
    public p_disc: number,
    public fk_sct_id: number,
  ) { }
}
