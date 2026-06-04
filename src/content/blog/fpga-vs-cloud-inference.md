---
title: 'Why on-device inference, not cloud'
description: 'Why running anomaly detection on the sensor itself is the only design that survives contact with a real factory floor.'
pubDate: 'May 26 2026'
---

The first question every investor asks: "Why on-device? Why not just stream the data to AWS?"

It's a fair question. Cloud is easier to prototype. For enterprise vendors deploying into climate-controlled plants with redundant fiber and reliability engineers on staff, cloud is a defensible choice.

Our customer isn't enterprise. Our customer is a plant manager at a mid-market food and beverage facility outside Saint-Hyacinthe. The constraints are different.

## Latency, network, and the cost of being wrong

A bearing failure on a high-RPM separator gives you milliseconds of warning, not seconds. Cloud round-trips average 80 to 200 ms even on a clean 4G connection. That's already too wide a window for protective shutdown. On-device inference at sub-2 ms keeps the safety case clean.

A typical mid-market plant also has spotty wireless coverage and an IT team that is structurally hostile to anything that wants to punch through the firewall. Anything that depends on a continuous cloud connection spends 30% of its uptime offline. Our customer can't afford that. Neither can we.

## The 5-watt budget

The reason on-device anomaly detection has historically been a research project rather than a product is power. A generic compute platform running the model would draw 15 to 30 watts and need active cooling. Neither is acceptable on a sensor that bolts to a motor housing.

Modern edge AI accelerators changed that math. We can sit comfortably under 5 watts with the full model running continuously. That's the architecture that makes the rest of the product possible.

## What we give up

The easy iteration loop. Pushing a new model means a quantization-aware retraining pass, hardware-in-the-loop validation, and an OTA update. That pipeline took most of Phase 1 to build. We'd trade it for any approach that actually delivered for our customer. None does.

. Nirmal
