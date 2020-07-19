import 'package:flutter_test/flutter_test.dart';
import 'package:test_dev_app/coupon.dart';

final String backendUrl = 'http://51.83.42.212:3000';
final String couponId = '5eb00fce030b66923c6a9125';
final String value = '80';
void main() {
  test('Coupon with 80 reduction should be found', () async {
    var qrText = "";
    Coupon coupon = await fetchCoupon(backendUrl, couponId);

    qrText = frenchReduction(coupon.value.toString());
    expect(qrText, frenchReduction(value));
  });
}
