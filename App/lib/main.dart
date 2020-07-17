import 'package:flutter/material.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:qr_code_scanner/qr_scanner_overlay_shape.dart';

import 'dart:async';
import 'dart:convert';
import 'dart:developer';

import 'package:http/http.dart' as http;

Future<Coupon> fetchCoupon(String couponId) async {
  final response = await http.get(
      'http://51.83.42.212:3000/coupons/' + couponId,
      headers: {'Content-Type': 'application/json', 'charset': 'utf-8'});

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.

    log(response.body);
    return Coupon.fromJson(json.decode(response.body));
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load Coupon');
  }
}

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

void main() {
  runApp(MaterialApp(home: MyApp()));
}

class MyApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  GlobalKey qrKey = GlobalKey();
  var qrText = "";
  QRViewController controller;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: <Widget>[
          Expanded(
            flex: 5,
            child: QRView(
                key: qrKey,
                overlay: QrScannerOverlayShape(
                  borderRadius: 10,
                  borderColor: Colors.red,
                  borderLength: 30,
                  borderWidth: 10,
                  cutOutSize: 300,
                ),
                onQRViewCreated: _onQRViewCreated),
          ),
          Expanded(
            flex: 1,
            child: Center(child: Text('Scan result: $qrText')),
          )
        ],
      ),
    );
  }

  @override
  void dispose() {
    controller?.dispose();
    super.dispose();
  }

  void _onQRViewCreated(QRViewController controller) {
    Future<Coupon> futureCoupon;
    this.controller = controller;
    controller.scannedDataStream.listen((scanData) {
      futureCoupon = fetchCoupon(scanData);

      setState(() {
        futureCoupon.then((value) => {qrText = value.message});
      });
    });
  }
}
