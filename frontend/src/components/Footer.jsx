import {
    FacebookOutlined,
    InstagramOutlined,
    SendOutlined,
    TwitterOutlined,
    YoutubeOutlined,
  } from "@ant-design/icons";
  import { Button, Input } from "antd";
  import React from "react";
  import { Link } from "react-router-dom";
  import styled from "styled-components";
  
  const StyledFooter = styled.footer`
    background-color: #f8f9fa;
    padding: 4rem 0;
    color: #333;
  `;
  
  const FooterColumn = styled.div`
    margin-bottom: 2rem;
  `;
  
  const FooterTitle = styled.h5`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  `;
  
  const FooterLink = styled(Link)`
    color: #666;
    text-decoration: none;
    display: block;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
  
    &:hover {
      color: #007bff;
    }
  `;
  
  const SocialIcon = styled.a`
    font-size: 1.5rem;
    color: #666;
    margin-right: 1rem;
    transition: color 0.3s ease;
  
    &:hover {
      color: #007bff;
    }
  `;
  
  const Newsletter = styled.div`
    display: flex;
    margin-top: 1rem;
  `;
  
  const Copyright = styled.p`
    text-align: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #ddd;
  `;
  
  const Footer = () => {
    return (
      <StyledFooter>
        <div className="container">
          <div className="row">
            <FooterColumn className="col-md-4">
              <FooterTitle>Event Craft</FooterTitle>
              <p>We would love to hear from you! Contact us directly through mail.</p>
              <Newsletter>
                <Input placeholder="Enter your email" style={{ width: "70%" }} />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  style={{ marginLeft: "10px" }}
                >
                  Subscribe
                </Button>
              </Newsletter>
            </FooterColumn>
            <FooterColumn className="col-md-2">
              <FooterTitle>Company</FooterTitle>
              <FooterLink to="/homepage">Home</FooterLink>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/terms">Terms & Condition</FooterLink>
            </FooterColumn>
            <FooterColumn className="col-md-4">
              <FooterTitle>Connect With Us</FooterTitle>
              <div>
                <SocialIcon
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookOutlined />
                </SocialIcon>
                <SocialIcon
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramOutlined />
                </SocialIcon>
                <SocialIcon
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YoutubeOutlined />
                </SocialIcon>
                <SocialIcon
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterOutlined />
                </SocialIcon>
              </div>
            </FooterColumn>
          </div>
          <Copyright>
          © {new Date().getFullYear()} Event Craft. 
          </Copyright>
        </div>
      </StyledFooter>
    );
  };
  
  export default Footer;
  