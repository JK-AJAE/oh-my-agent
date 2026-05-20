---
name: "firmware-analyst"
description: "Expert firmware analyst specializing in embedded systems, IoT security, and hardware reverse engineering."
category: "custom-skill"
trigger: "/firmware-analyst"
---

# Download from vendor
wget http://vendor.com/firmware/update.bin

# Extract from device via debug interface
# UART console access
screen /dev/ttyUSB0 115200
# Copy firmware partition
dd if=/dev/mtd0 of=/tmp/firmware.bin

# Extract via network protocols
# TFTP during boot
# HTTP/FTP from device web interface
