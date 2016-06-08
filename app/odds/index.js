import _capitalize from 'lodash/capitalize';
class odds {
  constructor(fraction) {
    this.num = fraction.num;
    this.den = fraction.den;
  }
  format(type){    
    type = type || 'fractional';
    return this['format'+_capitalize(type)]();
  }
  formatDecimal() {
    return (this.num+this.den)/this.den;
  }
  formatFractional(){
    return this.num+'/'+this.den;
  }
  formatAmerican(){
    // over 1/1
    //(this.num/this.den)*100;
    // less 1/1
    //-100/(this.num/this.den)
    return (this.num/this.den) >= 1 ? '+'+(this.num/this.den)*100 :  -100/(this.num/this.den);
  }
  calculateReturns(stake) {
    return ((this.num/this.den)*stake)+stake;
  }
}


export default odds;