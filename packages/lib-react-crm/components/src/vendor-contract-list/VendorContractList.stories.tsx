import React from "react";
import {VendorContractList} from "./VendorContractList";
import {IVendorContractListProps} from "./IVendorContractList";
import { Story } from '@storybook/react/types-6-0';

export default {
    title: 'Vendor Contract List',
    component: VendorContractList,
  };

const vendorContractProps = {
	"action": "Success",
	"totalRecords": 8,
	"data": [{
			"vendorContractId": 111,
			"poType": "Out-Right",
			"isDefault": 1,
			"factorySourcing": 0,
			"createdAt": "15-04-2022",
			"updatedAt": "18-04-2022",
			"rtvDays": 45,
			"isActive": 1
		},

		{
			"vendorContractId": 112,
			"poType": "Out-Right",
			"isDefault": 0,
			"factorySourcing": 0,
			"createdAt": "15-04-2022",
			"updatedAt": "18-04-2022",
			"rtvDays": 45,
			"isActive": 1
		}
	]

};
const Template: Story<IVendorContractListProps> = (args) => <VendorContractList {...args} />;
export const VendorContractComponent = Template.bind({});
VendorContractComponent.args = vendorContractProps;