import { $api } from "@/services/api";
export default function () {
  const sendEmail = async (serviceId, templateId, templateParams, userId) => {
    await $api.emails.sendEmail({
      serviceId: serviceId,
      templateId: templateId,
      templateParams: templateParams,
      userId: userId,
    });
  };

  return { sendEmail };
}
