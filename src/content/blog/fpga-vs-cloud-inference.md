---
title: 'Why on-device FPGA inference, not cloud'
description: 'The architectural decision at the heart of MidMon — and why doing anomaly detection on a 5-watt FPGA at the asset is the only design that survives contact with a real factory floor.'
pubDate: 'May 26 2026'
---

The first question every investor asks us is the same: "Why on-device? Why not just stream the data to AWS?"

It's a fair question. Cloud is easier. Cloud is cheaper to prototype. Cloud lets you iterate on models without an OTA bitstream pipeline. And for the enterprise predictive maintenance vendors — who deploy into climate-controlled refinery and pharma environments with redundant fiber and dedicated reliability teams — cloud is genuinely a defensible choice.

But our customer isn't enterprise. Our customer is the plant manager at a mid-market food and beverage facility outside Saint-Hyacinthe, and her constraints are different.

## Latency, network, and the cost of being wrong

A bearing failure on a high-RPM separator gives you milliseconds of warning, not seconds. Cloud round-trips — even with a clean 4G connection — average 80 to 200 ms. That's a window that's already too wide for protective shutdown. On-device inference at sub-2 ms keeps the safety case clean.

A typical mid-market plant has spotty wireless coverage at best and an IT team that is structurally hostile to anything that wants to punch through their firewall. Anything that depends on a continuous cloud connection will spend 30% of its uptime offline. Our customer can't afford that, and we can't afford the support tickets.

## The 5-watt budget

The reason on-device inference for transformer-class models has historically been a research project rather than a product is power. Running a real anomaly model on a generic ARM core would draw 15-30 watts and need active cooling — neither of which is acceptable on a sensor that's supposed to bolt to a motor housing.

The AMD Versal AI Edge family changed that math. Combined with a Hailo-8L for the heaviest matrix-multiply paths, we can sit comfortably under 5 watts with a full transformer encoder running continuously. That's the architecture that makes the rest of the product possible.

## What we give up

To be honest about it: we give up the easy iteration loop. Pushing a new model means a quantization-aware retraining pass, a hardware-in-the-loop validation run, and an OTA bitstream update — a pipeline that took us most of Phase 1 to build. We'd happily trade that for any other approach if any other approach actually delivered for our customer. None does.

— Nirmal
