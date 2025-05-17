import React from "react";
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

const Footeer = () => {
  return (
    <Footer
      container
      className="bg-gradient-to-t  mt-10  from-[#4d80e4] to-[#ffffff]"
      dir="rtl"
    >
      <div className="w-full text-center ">
        <div className="w-full justify-around h-auto flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="hidden lg:flex">
            <FooterBrand
              href="https://example.com"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
              name="المنظمة الوطنية للتضامن الطلابي"
              className="gap-3 [&>img]:-mr-2   font-extrabold lg:[&>span]:text-3xl "
            />
          </div>
          <FooterLinkGroup className="flex h-full items-center justify-center lg:gap-3">
            <FooterLink href="/links/about">حول المنظمة </FooterLink>
            <FooterLink href="/links/service-policy">سياسة الخدمة </FooterLink>
            <FooterLink href="/links/licensing-policy">الترخيص </FooterLink>
            <FooterLink href="/links/contacts-info">تواصل</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider className="bg-[#5b5b5b] border-[#5b5b5b]" />
        <FooterCopyright
          href="#"
          by="Organisatin National Solidarite Etudiante"
          className="text-tertiary"
          year={new Date().getFullYear()}
        />
      </div>
    </Footer>
  );
};

export default Footeer;
