import 'dart:convert';
import 'package:http/http.dart' as http;

class Coupon {
  final String id;
  final int value;
  final String message;

  Coupon({this.id, this.value, this.message});

  factory Coupon.fromJson(Map<String, dynamic> json) {
    return Coupon(
      id: json['id'],
      value: json['value'],
      message: json['message'],
    );
  }
}

/// Http request to retrieve coupon data
Future<Coupon> fetchCoupon(String backendUrl, String couponId) async {
  final response = await http.get(backendUrl + '/coupons/' + couponId);

  if (response.statusCode == 200) {
    return Coupon.fromJson(json.decode(response.body));
  }
  if (response.statusCode == 404) {
    return Future.error(response.statusCode);
  } else {
    return Future.error(
        response.statusCode, StackTrace.fromString(response.body));
  }
}

/// Return a french sentence about the reduction value
String frenchReduction(String value) {
  return 'Réduction de ' + value + ' %';
}

/// Return a french sentence about the coupon is invalid
String frenchInvalidCoupon() {
  return 'Coupon Invalide';
}
