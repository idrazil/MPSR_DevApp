import 'dart:async';
import 'package:flutter/material.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:qr_code_scanner/qr_scanner_overlay_shape.dart';
import 'coupon.dart';

final String backendUrl = 'http://51.83.42.212:3000';

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
            child: Center(child: Text('$qrText')),
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
      futureCoupon = fetchCoupon(backendUrl, scanData);

      setState(() {
        futureCoupon.then(
            (response) => {qrText = frenchReduction(response.value.toString())},
            onError: (e) {
          qrText = frenchInvalidCoupon();
        });
      });
    });
  }
}
